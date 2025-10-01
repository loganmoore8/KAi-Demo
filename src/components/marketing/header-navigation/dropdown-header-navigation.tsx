import { BookClosed, PlayCircle, Stars02, MessageChatCircle, Zap, Calculator } from "@untitledui/icons";
import { NavMenuItemLink } from "./base-components/nav-menu-item";

const resourcesItems = [
    {
        title: "Blog",
        subtitle: "The latest industry news and guides curated by our expert team.",
        href: "/blog",
        Icon: BookClosed,
    },
    {
        title: "Integrations",
        subtitle: "Connect with your favorite tools and platforms.",
        href: "/integrations",
        Icon: Zap,
    },
    {
        title: "ROI Calculator",
        subtitle: "Calculate your return on investment with our tools.",
        href: "/roi-calculator",
        Icon: Calculator,
    },
];

const defaultItems = [
    {
        title: "Blog",
        subtitle: "The latest industry new and guides curated by our expert team.",
        href: "/blog",
        Icon: BookClosed,
    },
    {
        title: "Customer stories",
        subtitle: "Learn how our customers are using Untitled UI to 10x their growth.",
        href: "/customer-stories",
        Icon: Stars02,
    },
    {
        title: "Video tutorials",
        subtitle: "Get up and running on our newest features and in-depth guides.",
        href: "/tutorials",
        Icon: PlayCircle,
    },
];


export const ResourcesDropdownMenu = () => {
    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
                <ul className="flex flex-col gap-0.5">
                    {resourcesItems.map(({ title, subtitle, href, Icon }) => (
                        <li key={title}>
                            <NavMenuItemLink icon={Icon} title={title} subtitle={subtitle} href={href} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export const DropdownMenuSimple = () => {
    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
                <ul className="flex flex-col gap-0.5">
                    {defaultItems.map(({ title, subtitle, href, Icon }) => (
                        <li key={title}>
                            <NavMenuItemLink icon={Icon} title={title} subtitle={subtitle} href={href} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
