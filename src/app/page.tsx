"use client";

import { useState, useRef, useEffect, useMemo } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { buttonVariantsConfig } from "@/components/ui/button";
import { PlaygroundButtonProps, PostMessageData } from "@/lib/types";
import { ThemeSwitcher } from "@/components/theme-switcher";

const variantOptions = Object.keys(
  buttonVariantsConfig.variants.variant
) as PlaygroundButtonProps["variant"][];

const sizeOptions = Object.keys(
  buttonVariantsConfig.variants.size
) as PlaygroundButtonProps["size"][];

export default function Home() {
  const [variant, setVariant] =
    useState<PlaygroundButtonProps["variant"]>("default");
  const [size, setSize] = useState<PlaygroundButtonProps["size"]>("default");
  const [disabled, setDisabled] = useState(false);
  const [children, setChildren] = useState("Click Me");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentProps = useMemo(
    (): PlaygroundButtonProps => ({
      variant,
      size,
      disabled,
      children,
    }),
    [variant, size, disabled, children]
  );

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const message: PostMessageData = {
        type: "UPDATE_PROPS",
        props: currentProps,
      };
      iframeRef.current.contentWindow.postMessage(message, "*");
    }
  }, [currentProps]);

  return (
    <main className="flex min-h-screen">
      <div
        className="w-[300px] flex-shrink-0 border-r h-full overflow-y-auto p-6 gap-6 flex flex-col"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Controls Panel
          </h2>
          <ThemeSwitcher
            size="icon"
            variant="secondary"
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="variant-select">Variant</Label>
            <Select
              value={variant ?? undefined}
              onValueChange={(value) =>
                setVariant(value as PlaygroundButtonProps["variant"])
              }
            >
              <SelectTrigger id="variant-select">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent align="start">
                {variantOptions.map((v) => (
                  <SelectItem key={v!} value={v!}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size-select">Size</Label>
            <Select
              value={size ?? undefined}
              onValueChange={(value) =>
                setSize(value as PlaygroundButtonProps["size"])
              }
            >
              <SelectTrigger id="size-select">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent align="start">
                {sizeOptions.map((s) => (
                  <SelectItem key={s!} value={s!}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="children-input">Children (Text)</Label>
            <Input
              id="children-input"
              type="text"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="disabled-check"
              checked={disabled}
              onCheckedChange={(checked) => setDisabled(checked as boolean)}
            />
            <Label
              htmlFor="disabled-check"
              className="text-sm font-normal leading-none"
            >
              Disabled
            </Label>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <iframe
          ref={iframeRef}
          src="/preview"
          title="Component Preview"
          className="size-full border-0"
        />
      </div>
    </main>
  );
}
