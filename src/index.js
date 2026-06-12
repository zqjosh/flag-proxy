export default {
  async fetch(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const size = url.searchParams.get("size") || "64";
    if (!code) return new Response("Missing code", { status: 400 });
    const cleanCode = code.replace(/[^A-Z]/gi, "");
    const cleanSize = ["16","24","32","48","64"].includes(size) ? size : "64";
    return fetch(`https://flagsapi.com/${cleanCode}/flat/${cleanSize}.png`);
  }
};
