import {Input} from "@/components/ui/input";
import {Search} from "lucide-react"
import {Link, useNavigate} from "react-router-dom";

export function StoreLayout({children}) {
    const navigate = useNavigate();
    const onSearch = (event: any) => {
        if (event.key !== 'Enter') {
            return;
        }
        event.preventDefault();
        const query = event.target.value;
        navigate(`/search?q=${query}`);
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header
                className="sticky z-20 top-0 flex h-16  items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav
                    className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        to={'/store'}
                        className="text-muted-foreground transition-colors hover:text-foreground text-lg"
                    >
                        Store
                    </Link>
                </nav>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                onKeyDown={onSearch}
                            />
                        </div>
                    </form>
                </div>
            </header>
            <div
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                {children}
            </div>
        </div>
    )
}
