import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

// Automatically infer the variant and size types from the buttonVariants
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

// We need to sync the props between Manager and Preview
export interface PlaygroundButtonProps {
  variant: ButtonVariantProps["variant"];
  size: ButtonVariantProps["size"];
  disabled: boolean;
  children: string;
}

// The data format for postMessage
export interface PostMessageData {
  type: "UPDATE_PROPS";
  props: PlaygroundButtonProps;
}
