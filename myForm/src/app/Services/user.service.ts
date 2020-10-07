import { Injectable ,ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	selectedUser: User;
	users: User[];
  readonly baseURL = 'http://localhost:3001/users';

  constructor(private http: HttpClient, private el: ElementRef) { }

  postUser(user: User) {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#resume');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      formData.append('name',user.name);
      formData.append('email',user.email);
      formData.append('gender',user.gender);
      formData.append('address',user.address);
      formData.append('city',user.city);
      formData.append('zip',user.zip as any);
      formData.append('domain',user.domain);
      formData.append('coverLetter',user.coverLetter);
      formData.append('resume', inputEl.files.item(0));
      //console.log(user,'inputEl.files',inputEl.files);
      //console.log(this.http);
    }
    return this.http.post(this.baseURL,formData);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }

  putUser(user: User) {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#resume');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      formData.append('name',user.name);
      formData.append('email',user.email);
      formData.append('gender',user.gender);
      formData.append('address',user.address);
      formData.append('city',user.city);
      formData.append('zip',user.zip as any);
      formData.append('domain',user.domain);
      formData.append('coverLetter',user.coverLetter);
      formData.append('resume', inputEl.files.item(0));
    }
    return this.http.put(this.baseURL + `/${user._id}`,formData );
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
