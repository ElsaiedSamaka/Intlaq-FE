import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.css'],
})
export class UserPopoverComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: string = '';
  @Input() article: any = {};
  followingCount: number = 0;
  followersCount: number = 0;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // check if current already follow the creator of the article
    this.isFollowing();
    this.followingCount = this.article.user.following.length;
    this.followersCount = this.article.user.follower.length;
  }
  follow(event: any, followingId: any): void {
    event.stopPropagation();
    let followerId = this.currentUser.id;
    const userToFollow = {
      followerId: followerId,
      followingId: followingId,
    };
    this.usersService.follow(userToFollow).subscribe({
      next: () => {
        this.isFollowing = () => true;
        this.followersCount = this.followersCount + 1;
      },
      error: () => {},
      complete: () => {},
    });
  }
  unfollow(event: any, followingId: any): void {
    event.stopPropagation();
    let followerId = this.currentUser.id;
    const userToUnFollow = {
      followerId: followerId,
      followingId: followingId,
    };
    this.usersService.unfollow(userToUnFollow).subscribe({
      next: () => {
        this.isFollowing = () => false;
        this.followersCount = this.followersCount - 1;
      },
      error: () => {},
      complete: () => {},
    });
  }
  isFollowing(): boolean {
    const currentUserID = this.currentUser.id;
    const followingUsers = this.article.user.following.map(
      (item) => item.followerId
    );
    return followingUsers.includes(currentUserID);
  }
}
