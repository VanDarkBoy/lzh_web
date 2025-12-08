export type BlogListItem = {
    id: string;
    title: string;
    image: string;
    pushDate: string;
    description: string;
};

export type BlogDetail = BlogListItem & {
    content: string;
};
