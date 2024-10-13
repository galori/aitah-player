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
  sentenceIndexForAuthor: number | null;
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
      sentenceCounter += 1; // leave a space between comments for the author
      comment.sentenceIndexForAuthor = sentenceCounter; // eslint-disable-line no-param-reassign
      comment.sentences.forEach((sentence:FlatSentence) => {
        sentenceCounter += 1;
        sentence.sentenceIndex = sentenceCounter; // eslint-disable-line no-param-reassign
      });
    });
  }

  private static createFlatComment(rawComment: RawComment, depth: number): Comment {
    const flatSentences = rawComment.sentences.map((sentence) => ({text: sentence, sentenceIndex: null}));
    return {
      sentences: flatSentences,
      author: rawComment.author,
      score: rawComment.score,
      postedAt: rawComment.postedAt,
      depth,
      sentenceIndexForAuthor: null
    }
  }

  private flattenComments() {

    if (this.rawComments === null) return;

    const results: Comment[] = [];
    const stack: Stack = this.rawComments.map(comment => ({rawComment: comment, depth: 0}));

    while (stack.length > 0) {
      const item = stack.shift();

      if (item) {
        const {rawComment, depth} = item;
        results.push(FetchComments.createFlatComment(rawComment, depth));

        if (rawComment.replies) {
          stack.unshift(...rawComment.replies.map(reply => ({rawComment: reply, depth: depth + 1})));
        }
      }

    }

    this.comments = results;
  }}

export default FetchComments;