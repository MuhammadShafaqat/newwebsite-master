import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticlesService } from '../admin-services/articles.service';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrl: './admin-articles.component.scss'
})
export class AdminArticlesComponent implements OnInit {

  articleForm: FormGroup;
  selectedFile: File | null = null;
  articles: any[] = [];
  editingArticleId: string | null = null;

 constructor(private fb: FormBuilder, private article: ArticlesService) {
    this.articleForm = this.fb.group({
      title: [''],
      body: ['']
    });
  }

  ngOnInit() {
    this.loadArticles();
  }
 loadArticles() {
    this.article.getArticles().subscribe((res) => {
      this.articles = res;
    });
  }


onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
  const formData = new FormData();
  formData.append('title', this.articleForm.get('title')?.value);
  formData.append('body', this.articleForm.get('body')?.value);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  if (this.editingArticleId) {
    this.article.updateArticle(this.editingArticleId, formData).subscribe({
      next: () => {
        alert('Article updated!');
        this.articleForm.reset();
        this.selectedFile = null;
        this.editingArticleId = null;
        this.loadArticles();
      },
      error: (err) => console.error('Update error:', err)
    });
    return;
  }

  this.article.createArticle(formData).subscribe({
    next: () => {
      alert('Article created!');
      this.articleForm.reset();
      this.selectedFile = null;
      this.loadArticles();
    },
    error: (err) => console.error(err)
  });
}


  onEdit(article: any) {
    this.editingArticleId = article.id;
    this.articleForm.patchValue({
      title: article.title,
      body: article.body
    });
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.article.deleteArticle(id).subscribe(() => {
        this.articles = this.articles.filter(a => a.id !== id);
      });
    }
  }

  cancelEdit() {
    this.editingArticleId = null;
    this.articleForm.reset();
  }


}
