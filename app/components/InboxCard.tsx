type InboxCardProps = {
    title: string;
};

export default function InboxCard({ title }: InboxCardProps) {
    return (
        <div className="p-4 border rounded-lg bg-white hover:border-black transition-colors shadow-md">
            <h3 className="text-lg font-medium text-black">{title}</h3>
            <p className="text-gray-600 mt-2">No new {title.toLowerCase()}</p>
        </div>
    );
} 