"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export interface SelectOption {
    default: boolean;
    lazy?: boolean;
    label: string;
    value: string;
    icon?: string;
    tooltip?: ReactNode;
}

interface Data {
    onChange?: (option: SelectOption) => void | Promise<void>;
    options: Array<SelectOption>;
    placeholder: string;
    className?: string;
    type?: "link" | "button";
    query?: string;
    direction?: "vertical" | "horizontal";
    position?: "top" | "bottom" | "left" | "right";
    showSelected?: boolean;
}

export default function Select({
    placeholder,
    onChange = () => {},
    className,
    options,
    type = "button",
    query,
    direction = "vertical",
    position = "bottom",
    showSelected = true
}: Data) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<SelectOption | undefined>(
        options.find((opt: SelectOption) => opt.default),
    );
    const inputRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        function clickHandler(event: globalThis.MouseEvent) {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        }

        window.addEventListener("click", clickHandler);

        return () => {
            window.removeEventListener("click", clickHandler);
        };
    }, []);

    function handleInputClick() {
        setShowMenu(!showMenu);
    }

    function getDisplay() {
        if (!selectedValue) {
            return placeholder;
        }

        return selectedValue.label;
    }

    function onItemClick(option: SelectOption) {
        setSelectedValue(option);
        if (type === "button") onChange(option);
        else router.push(`?${query}=${option.value}`);
        setShowMenu(false);
    }

    const getPositionClasses = () => {
        switch (position) {
            case "top":
                return "bottom-full mb-1 left-0 min-w-full w-max max-w-sm";
            case "left":
                return "right-full mr-1 top-0 min-w-max";
            case "right":
                return "left-full ml-1 top-0 min-w-max";
            default:
                return "top-full mt-1 left-0 min-w-full w-max max-w-sm";
        }
    };

    const getDirectionClasses = () => {
        if (direction === "horizontal") {
            return "flex flex-row flex-wrap items-center gap-1 p-1.5";
        }
        return "flex flex-col gap-0.5 p-1";
    };

    const getItemPaddingClasses = () => {
        if (direction === "horizontal") {
            return "px-2 py-1 gap-1.5 text-xs rounded-lg";
        }
        return "px-3 py-1.5 gap-2 rounded-xl";
    };

    const getArrowRotationOpenClasses = () => {
        switch(position) {
            case "top":
                return "rotate-90";
            case "left":
                return "";
            case "right":
                return "rotate-180";
            default:
                return "-rotate-90";
        }
    }

    const getArrowRotationClosedClasses = () => {
        switch(position) {
            case "top":
                return "-rotate-90";
            case "left":
                return "rotate-180";
            case "right":
                return "";
            default:
                return "rotate-90";
        }
    }

    return (
        <div className={className}>
            <div ref={inputRef} className="relative w-full">
                {/** biome-ignore lint/a11y/noStaticElementInteractions: for some reasons the enter handler doesn't work with buttons */}
                <div
                    // biome-ignore lint/a11y/noNoninteractiveTabindex: allow keyboard tab to focus it
                    tabIndex={0}
                    onClick={handleInputClick}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleInputClick();
                    }}
                    className="btn btn-soft flex items-center gap-2 w-full justify-between"
                >
                    {showSelected && (
                        <>
                            {selectedValue?.icon && (
                                <Image
                                    width={20}
                                    height={20}
                                    alt="Icon"
                                    src={selectedValue.icon}
                                    className="inline-block"
                                    loading={selectedValue?.lazy ? "lazy" : undefined}
                                />
                            )}
                            <span className="truncate">{getDisplay()}</span>
                        </>
                    )}
                    <span
                        className={`${
                            showMenu ? getArrowRotationOpenClasses() : getArrowRotationClosedClasses()
                        } transition-transform duration-200 icon-[tabler--chevron-right] size-5 text-base-content mr-[-5px]`}
                    />
                </div>

                {showMenu && (
                    <ul
                        className={`absolute z-50 max-h-80 overflow-y-auto bg-base-200 border border-base-content/10 rounded-box shadow-md ${getPositionClasses()} ${getDirectionClasses()}`}
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                // biome-ignore lint/a11y/noNoninteractiveTabindex: allow keyboard tab to focus it
                                tabIndex={0}
                                onClick={() => onItemClick(option)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") onItemClick(option);
                                }}
                                className={`flex items-center cursor-pointer hover:bg-base-300 transition-colors whitespace-nowrap ${getItemPaddingClasses()}`}
                            >
                                {option.icon && (
                                    <Image
                                        width={16}
                                        height={16}
                                        alt="Icon"
                                        src={option.icon}
                                        className="inline-block shrink-0"
                                    />
                                )}
                                <span className="truncate">{option.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}