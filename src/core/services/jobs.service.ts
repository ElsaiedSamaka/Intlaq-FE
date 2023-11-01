import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(
    private apiService: ApiService,
    private socketService: SocketService
  ) {}
  // Get List of Jobs Applications for specific user
  getApplicationsByUser(userId: string): Observable<any[]> {
    return this.apiService.get(`/api/jobs/applications/byUser/${userId}`);
  }
  // Get List of Jobs Applications for specific job
  getApplicationsByJob(jobId: string): Observable<any[]> {
    return this.apiService.get(`/api/jobs/applications/byJob/${jobId}`);
  }
  // Create new application for specific job
  createApplication(jobId: string, userId: string): Observable<any> {
    return this.apiService.post(`/api/jobs/applications`, { jobId, userId });
  }
  // Update application status
  updateApplication(jobId: string, userId: string): Observable<any> {
    return this.apiService.put(`/api/jobs/applications`);
  }
  // Delete application
  deleteApplication(applicationId: string): Observable<any> {
    return this.apiService.delete(`/api/jobs/applications/${applicationId}`);
  }
}
