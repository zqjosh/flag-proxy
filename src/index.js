export default {
  async fetch(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    if (!code) return new Response("Missing code", { status: 400 });
    return fetch(`https://flagsapi.com/${code}/flat/64.png`);
  }
};
