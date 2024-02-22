import { Component, Input } from '@angular/core';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { BlogModel } from '../../../../models/blog.model';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../../../services/blogs/blogs.service';

@Component({
  selector: 'blogs-list',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss',
})
export class BlogsListComponent {
  @Input({ required: true }) blogs: BlogModel[] = [];
  addBlogMetaData: BlogModel = {
    id: '1',
    title: 'Add a new blog',
    shortDescription: 'Add a new blog to the list of blogs.',
    imageUrl: 'assets/gifs/add-blog.gif',
    category: 'Add Blog',
    tags: [],
    comments: [],
    likes: [],
    content: 'Add a new blog to the list of blogs.',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  constructor(private blogsService: BlogsService) {}

  // ngOnInit(): void {
  //   this.blogs = this.blogsService.getBlogs();
  // }
}
