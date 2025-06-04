import { Injectable } from '@angular/core';
import { Article } from '../_models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }
    private articles: Article[] = [
  {
    id: 1,
    title: 'Exploring the Future of AI',
    date: '01.01.2025',
    body: 'Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Sustainable Living Tips',
    date: '10.01.2025',
    body: 'Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere.',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Travel on a Budget in 2025',
    date: '15.01.2025',
    body: 'Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Mastering Remote Work',
    date: '20.01.2025',
    body: 'Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere. Remote work is here to stay. Learn how to thrive while working from anywhere.',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Healthy Eating for Busy People',
    date: '25.01.2025',
    body: 'Quick and nutritious meal ideas for those with a tight schedule.',
    imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80'
  }
]

;

  getArticles(): Article[] {
    return [...this.articles];
  }

  getArticleById(id: number): Article | undefined {
    return this.articles.find(article => article.id === id);
  }
}
