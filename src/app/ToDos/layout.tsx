import NextTopLoader from "nextjs-toploader";

export const metadata = {
    title: "ToDo",
};
  
export default function TodosLayout({ children, }: { children: React.ReactNode }) {
    
    return (
        <>
        <NextTopLoader height={5}/>
        <section>{children}</section>
        </>
    );

}