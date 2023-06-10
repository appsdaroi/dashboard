import React from "react"

import {
    Button,
    Icon,
} from "@tremor/react";

interface ResponsiveButtonProps {
    children?: string | JSX.Element | JSX.Element[],
    [key: string]: any
}

import { isMobile } from 'react-device-detect';

const ResponsiveButton = (props: ResponsiveButtonProps) => {
    if (isMobile) {
        return (
            <Icon {...props}>{props.children}</Icon>
        )
    }

    return (
        <Button {...props}>{props.children}</Button>
    )
}

export { ResponsiveButton }