import {Post} from "../types";

interface RawComment {
  sentences: string[];
  author: string;
  postedAt: string;
  score: number;
  replies: RawComment[];
}

export interface FlatSentence {
  text: string;
  sentenceIndex: number | null;
}

export interface Comment {
  sentences: FlatSentence[];
  author: string;
  score: number;
  postedAt: string;
  depth: number;
}

export interface FetchCommentsProps {
  post: Post;
  setComments: (comments: Comment[]) => void;
}

type Item = { rawComment: RawComment; depth: number };
type Stack = Item[];

class FetchComments {

  private rawComments:(RawComment[] | null) = null;

  private comments: Comment[] = [];

  constructor(private readonly post: Post, private readonly setComments: (comment: Comment[]) => void) {}

  public async performFetch() {
    const response = await fetch(`/api/posts/${this.post.id}/comments`);
    this.rawComments = await response.json();
    if (this.rawComments) {
      this.flattenComments();
      this.numberSentences();
      this.setComments(this.comments);
    } else {
      throw new Error('error loading comments');
    }
  }

  private numberSentences() {
    let sentenceCounter = 0;
    this.comments.forEach((comment:Comment) => {
      comment.sentences.forEach((sentence:FlatSentence) => {
        sentenceCounter += 1;
        sentence.sentenceIndex = sentenceCounter; // eslint-disable-line no-param-reassign
      });
    });
  }

  private flattenComments() {

    if (this.rawComments === null) return;

    const results: Comment[] = [];
    const stack: Stack = this.rawComments.map(comment => ({rawComment: comment, depth: 0}));

    while (stack.length > 0) {
      const item = stack.pop();

      if (item) {
        const {rawComment, depth} = item;

        const flatSentences = rawComment.sentences.map((sentence) => ({text: sentence, sentenceIndex: null}));
        const flatComment = {
          sentences: flatSentences,
          author: rawComment.author,
          score: rawComment.score,
          postedAt: rawComment.postedAt,
          depth
        }
        results.unshift(flatComment);

        if (rawComment.replies) {
          stack.push(...rawComment.replies.map(reply => ({rawComment: reply, depth: depth + 1})));
        }
      }

    }

    this.comments = results;
  }}

export default FetchComments;