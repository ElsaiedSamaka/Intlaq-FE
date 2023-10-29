import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxEditorModule } from 'ngx-editor';
import { SanitizeHtmlPipe } from 'src/core/pipes/SanitizeHtmlPipe.pipe';
import { HttpLoaderFactory } from '../app.module';
import { ActionsIconComponent } from './actions-icon/actions-icon.component';
import { AlertComponent } from './alert/alert.component';
import { ArticleComponent } from './article/article.component';
import { PostAsComponent } from './article/post-as/post-as.component';
import { TruncatedTextComponent } from './article/truncated-text/truncated-text.component';
import { UserPopoverComponent } from './article/user-popover/user-popover.component';
import { EditorComponent } from './editor/editor.component';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationIconComponent } from './navbar/notification-icon/notification-icon.component';
import { SwitchThemeComponent } from './navbar/switch-theme/switch-theme.component';
import { PopupComponent } from './popup/popup.component';
import { ProseComponent } from './prose/prose.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { DataService } from './services/data.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TagComponent } from './tag/tag.component';
import { ToastComponent } from './toast/toast.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CommonModule,
    AngularEditorModule,
    RouterModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ModalComponent,
    PopupComponent,
    InputComponent,
    FormComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    EmojiPickerComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ProseComponent,
    UserAvatarComponent,
    ArticleComponent,
    TruncatedTextComponent,
    PostAsComponent,
    WysiwygComponent,
    EditorComponent,
    SanitizeHtmlPipe,
    ActionsIconComponent,
    SwitchThemeComponent,
    TagComponent,
    LangSelectorComponent,
    SearchModalComponent,
    UserPopoverComponent,
    NotificationIconComponent,
    CounterComponent,
  ],
  exports: [
    ModalComponent,
    PopupComponent,
    InputComponent,
    FormComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    EmojiPickerComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ProseComponent,
    UserAvatarComponent,
    ArticleComponent,
    TruncatedTextComponent,
    PostAsComponent,
    WysiwygComponent,
    EditorComponent,
    ActionsIconComponent,
    SwitchThemeComponent,
    TagComponent,
    LangSelectorComponent,
    SearchModalComponent,
    UserPopoverComponent,
    NotificationIconComponent,
    CounterComponent,
  ],
  providers: [DataService],
})
export class SharedModule {}
