import { useEffect, useState } from "react";

export default function NavLinkWrapper({ items, astroPath }) {
    const [activeUrl, setActiveUrl] = useState(astroPath);

    useEffect(() => {
        changeLinkHandler();
    }, []);

    function changeLinkHandler(url) {
        if (!url) return;

        setActiveUrl(url);
    }

    return (
        <ul className="flex justify-center gap-4">
            {items.map((item, idx) => (
                <li key={idx}>
                    <a
                        href={item.url}
                        className={`hover:text-amber-500 ${
                            activeUrl === item.url && "text-white"
                        }`}
                        onClick={() => changeLinkHandler(item.url)}
                    >
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}
