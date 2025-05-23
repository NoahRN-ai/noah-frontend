
    import { cn } from '@/lib/utils';
    import * as ToastPrimitives from '@radix-ui/react-toast';
    import { cva } from 'class-variance-authority';
    import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
    import React from 'react';

    const ToastProvider = ToastPrimitives.Provider;

    const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
      <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
          'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
          className,
        )}
        {...props}
      />
    ));
    ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

    const toastVariants = cva(
      'data-[swipe=move]:transition-none group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
      {
        variants: {
          variant: {
            default: 'bg-background border text-foreground',
            destructive:
              'group destructive border-destructive bg-destructive text-destructive-foreground',
            success: 
              'group success border-brand-emeraldGreen/50 bg-brand-emeraldGreen text-brand-parchmentWhite',
            error: 
              'group error border-brand-vermilionRed/50 bg-brand-vermilionRed text-brand-parchmentWhite',
            info: 
              'group info border-brand-byzantineBlue/50 bg-brand-byzantineBlue text-brand-parchmentWhite',
          },
        },
        defaultVariants: {
          variant: 'default',
        },
      },
    );

    const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
      let IconComponent = null;
      if (variant === 'success') IconComponent = CheckCircle;
      else if (variant === 'error' || variant === 'destructive') IconComponent = AlertTriangle;
      else if (variant === 'info') IconComponent = Info;

      return (
        <ToastPrimitives.Root
          ref={ref}
          className={cn(toastVariants({ variant }), className)}
          {...props}
        >
          {IconComponent && <IconComponent className="h-6 w-6 mr-2 flex-shrink-0" />}
          <div className="flex-grow">{props.children}</div>
        </ToastPrimitives.Root>
      );
    });
    Toast.displayName = ToastPrimitives.Root.displayName;

    const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
      <ToastPrimitives.Action
        ref={ref}
        className={cn(
          'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
          'group-[.success]:border-brand-parchmentWhite/30 group-[.success]:hover:border-brand-parchmentWhite/30 group-[.success]:hover:bg-brand-parchmentWhite/20 group-[.success]:hover:text-brand-parchmentWhite group-[.success]:focus:ring-brand-emeraldGreen',
          'group-[.error]:border-brand-parchmentWhite/30 group-[.error]:hover:border-brand-parchmentWhite/30 group-[.error]:hover:bg-brand-parchmentWhite/20 group-[.error]:hover:text-brand-parchmentWhite group-[.error]:focus:ring-brand-vermilionRed',
          'group-[.info]:border-brand-parchmentWhite/30 group-[.info]:hover:border-brand-parchmentWhite/30 group-[.info]:hover:bg-brand-parchmentWhite/20 group-[.info]:hover:text-brand-parchmentWhite group-[.info]:focus:ring-brand-byzantineBlue',
          className,
        )}
        {...props}
      />
    ));
    ToastAction.displayName = ToastPrimitives.Action.displayName;

    const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
      <ToastPrimitives.Close
        ref={ref}
        className={cn(
          'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
          'group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
          'group-[.success]:text-brand-parchmentWhite/70 group-[.success]:hover:text-brand-parchmentWhite group-[.success]:focus:ring-brand-parchmentWhite group-[.success]:focus:ring-offset-brand-emeraldGreen',
          'group-[.error]:text-brand-parchmentWhite/70 group-[.error]:hover:text-brand-parchmentWhite group-[.error]:focus:ring-brand-parchmentWhite group-[.error]:focus:ring-offset-brand-vermilionRed',
          'group-[.info]:text-brand-parchmentWhite/70 group-[.info]:hover:text-brand-parchmentWhite group-[.info]:focus:ring-brand-parchmentWhite group-[.info]:focus:ring-offset-brand-byzantineBlue',
          className,
        )}
        toast-close=""
        {...props}
      >
        <X className="h-4 w-4" />
      </ToastPrimitives.Close>
    ));
    ToastClose.displayName = ToastPrimitives.Close.displayName;

    const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
      <ToastPrimitives.Title
        ref={ref}
        className={cn('text-sm font-semibold', className)}
        {...props}
      />
    ));
    ToastTitle.displayName = ToastPrimitives.Title.displayName;

    const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
      <ToastPrimitives.Description
        ref={ref}
        className={cn('text-sm opacity-90', className)}
        {...props}
      />
    ));
    ToastDescription.displayName = ToastPrimitives.Description.displayName;

    export {
      Toast,
      ToastAction,
      ToastClose,
      ToastDescription,
      ToastProvider,
      ToastTitle,
      ToastViewport,
    };
  