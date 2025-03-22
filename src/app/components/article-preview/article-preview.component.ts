import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent {
  @Input() imageUrl: string = '';
  @Input() articleNumber: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
