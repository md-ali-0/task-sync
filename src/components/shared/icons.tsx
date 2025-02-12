/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

export const Icons = {
    spinner: ({className}: {className: string}) => (
        <svg
            role="status"
            className="inline w-4 h-4 mr-2 animate-spin text-gray-200 dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 50a40 40 0 0 1 80 0v0a40 40 0 1 1-80 0v0z"
                fill="currentColor"
            />{" "}
        </svg>
    ),
    gitHub: ({className}: {className: string}) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M10 0a10 10 0 100 20A10 10 0 0010 0zm.227 5.773a3 3 0 014.227 1.227l.227.227a3 3 0 01-4.227 4.227l-.227-.227a3 3 0 01-1.227-4.227zm7.773 4.227a3 3 0 01-4.227 1.227l-.227.227a3 3 0 014.227 4.227l.227-.227a3 3 0 011.227-4.227zM10 10a2 2 0 110-4 2 2 0 010 4zm-2 2a2 2 0 11-4 0 2 2 0 014 0z"
                clipRule="evenodd"
            />
        </svg>
    ),
};
