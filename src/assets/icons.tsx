import * as React from "react"

export function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M6 14v6H0v-6zm14 2v2H8v-2zM4 16H2v2h2zm2-9v6H0V7zm14 2v2H8V9zM4 9H2v2h2zm2-9v6H0V0zm14 2v2H8V2zM4 2H2v2h2z"
        fill={props.color}
      />
      <path fill="none" d="M0 0h20v20H0z" />
    </svg>
  )
}


export function ImportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M2 16v2h16v-2h2v4H0v-4zm8-15l6.065 6.058-1.413 1.415L11 4.826v12.019H9V4.61l-4.282 3.9-1.346-1.484z"
        fill={props.color}
      />
      <path fill="none" d="M0 0h20v20H0z" />
    </svg>
  )
}


export function ExportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M2 16v2h16v-2h2v4H0v-4zm9-16v12.173l3.652-3.646 1.413 1.415L10 16 3.372 9.974l1.345-1.48L9 12.389V0z"
        fill={props.color}
      />
      <path fill="none" d="M0 0h20v20H0z" />
    </svg>
  )
}

export function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M11 2v7h7v2h-7v7H9v-7H2V9h7V2z"
        fill={props.color}
      />
      <path fill="none" d="M0 0h20v20H0z" />
    </svg>
  )
}

export function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M14 0v3h5v2h-2v15H3V5H1V3h5V0zm1 5H5v13h10zM8 7v9H6V7zm3 0v9H9V7zm3 0v9h-2V7zm-2-5H8v1h4z"
        fill={props.color}
      />
      <path fill="none" d="M0 0h20v20H0z" />
    </svg>
  )
}

