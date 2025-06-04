import { Component } from '@angular/core';
import { Article } from '../_models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

  article?: Article;

  constructor(private route: ActivatedRoute, private articleService: ArticlesService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.article = this.articleService.getArticleById(id);
  }

}
