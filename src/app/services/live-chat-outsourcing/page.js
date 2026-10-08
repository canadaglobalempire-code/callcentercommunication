import BlogPostPage, { generateMetadata as blogMetadata } from "@/app/blog/[slug]/page";
const params = Promise.resolve({ slug: "live-chat-outsourcing" });
export function generateMetadata() { return blogMetadata({ params }); }
export default function Page() { return <BlogPostPage params={params} />; }
