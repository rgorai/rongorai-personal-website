import React, { Component, ErrorInfo, ReactNode } from 'react'
import ApiError from '../../Misc/components/ApiError'

type Props = {
  children: ReactNode
  message: string
  onCatch?: () => void
  FallbackComponent?: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error: ${this.props.message}`)
  }

  public render() {
    const { onCatch, FallbackComponent } = this.props
    if (this.state.hasError) {
      if (onCatch) onCatch()
      if (FallbackComponent) return FallbackComponent
      return (
        <ApiError
          status={500}
          statusText="Internal Server Error"
          data={this.props.message}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
