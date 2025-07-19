import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const page = await getPage(resolvedParams.slug);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="content-header">
          <h1 className="page-title">
            {page.title}
          </h1>
        </div>
        
        <div className="content-body">
          <PortableText value={page.content} />
        </div>
      </div>
    </div>
  );
}
