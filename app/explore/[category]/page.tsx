import { redirect } from "next/navigation";
export default async function ExploreCategoryPage({params}:{params:Promise<{category:string}>}){
  const {category}=await params;
  redirect(`/en/explore/${category}`);
}
