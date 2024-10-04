
export interface Comment {
  sentences: string[];
  author: string;
  postedAt: string;
  score: number;
  replies: Comment[];
}

export type Comments = Comment[];

export interface FetchCommentsProps {
  postId: string;
  setComments: (comments: Comments) => void;
}

class FetchComments {

  private comments:(Comments | null) = null;

  constructor(private readonly postId: string, private readonly setComments: (comments: Comments) => void) {}

  public async performFetch() {
    const response = await fetch(`/api/posts/${this.postId}/comments`);
    this.comments = await response.json();
    if (this.comments) {
      this.setComments(this.comments);
    } else {
      throw new Error('error loading comments');
    }
  }
}

export default FetchComments;