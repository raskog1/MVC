export default {
  async getImages() {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    return response.json();
  },
};
