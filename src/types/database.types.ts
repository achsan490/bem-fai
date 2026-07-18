export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

export type DbArticleInsert = Omit<Article, 'id' | 'created_at'>;
export type DbArticleUpdate = Partial<DbArticleInsert>;
