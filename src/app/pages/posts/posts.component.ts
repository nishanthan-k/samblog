import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [HttpClientModule, NgFor],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts = [] as Post[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
      this.postService.getPosts().subscribe(posts => this.posts = posts);
  }
}
