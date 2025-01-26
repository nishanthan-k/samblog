import { Post } from './../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = "http://localhost:8080/posts";

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPosts(post: Post) {
    return this.http.post<Post>(this.apiUrl, post);
  }
}
