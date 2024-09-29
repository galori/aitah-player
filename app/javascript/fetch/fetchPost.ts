import {Post} from "../types";

class FetchPost {
  private fetchStarted = false;

  constructor(private readonly id: string, private readonly onFetched: (post: Post) => void) {}

  public async fetch(): Promise<void> {
    if (this.fetchStarted) {
      return;
    }
    fetch(`/api/posts/${this.id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((data) => {
        this.onFetched(data);
        this.fetchStarted = true;
      })
      .catch(console.error);
  }
}

export default FetchPost;