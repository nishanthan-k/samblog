import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { getCurrentDateTime } from '../../utils/helper';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-new-post',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit {
  newPost: any;
  isFormSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private postService: PostService) {  }

  ngOnInit(): void {
      this.postService.getPosts().subscribe(posts => console.log('posts', posts))
      this.newPost = this.formBuilder.group({
        title: new FormControl('New Title', Validators.required),
        postContent: new FormControl('New Blog Post', Validators.required),
      })
  }

  isFieldRequired = (field: string) => {
    const control = this.newPost.get(field);
    if (!control || !control.validator) return false;

    const validatorFn = control.validator({} as any);
    return validatorFn?.['required'] !== undefined;
  }

  checkForError = (field: string) => {
    const fieldValue = this.newPost.get(field);
    const isReqField = this.isFieldRequired(field);

    let isReqError = isReqField && fieldValue?.dirty && fieldValue?.errors?.required;

    if (isReqField && fieldValue?.dirty) {
      isReqError = false
    }

    isReqError = fieldValue?.errors?.required
    const isValid = fieldValue?.invalid && fieldValue?.touched;
    return isReqError && isValid;
  }

  formSubmit = () => {
    console.log(this.newPost.valid, getCurrentDateTime());
    this.isFormSubmitted = true;

    this.newPost.markAllAsTouched();

    if (this.newPost.valid) {
      const { title, postContent } = this.newPost.value;
      const currentTime = getCurrentDateTime();

      const postData: Post = {
        id: currentTime,
        author: 1, // Replace with the actual author ID or name
        title,
        blog_content: postContent,
        createdAt: currentTime,
        updatedAt: currentTime,
        isDeleted: false,
        isArchived: false,
      };

      console.log('Submitting post:', postData);
      this.postService.addPosts(postData).subscribe(
        (response) => {
          console.log('Post added successfully:', response);
          this.newPost.reset();
        },
        (error) => {
          console.error('Error adding post:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please check the required fields.');
    }
  };
}
