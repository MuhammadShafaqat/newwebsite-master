import { Component, OnInit } from '@angular/core';
import { Article } from '../_models/article';
import { ArticlesService } from '../services/articles.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit{

    searchTerm = '';
  articles: Article[] = [];

  constructor(private articleService: ArticlesService, private router: Router) {  }

  ngOnInit(): void {
  this.articleService.getArticles().subscribe({
    next: (data) => this.articles = data,
    error: (err) => console.error('Error fetching articles:', err)
  });
}

  get filteredArticles(): Article[] {
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      article.body.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

openArticle(id: string) {
  if (typeof id === 'string') {
    this.router.navigate(['/article', id]);
  } else {
    console.error('Invalid article ID in openArticle()', id);
  }
}


}
