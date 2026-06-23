"use client";

import { useId, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/mascot/mascot";
import { useGamify } from "@/components/gamify-context";
import { cleanNickname, isValidNickname, NICKNAME_MAX } from "@/lib/nickname";

export type NicknameModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "gate" | "edit";
};

/** The form is a separate component so its state mounts fresh each open. */
function NicknameForm({
  mode,
  initial,
  onSubmit,
  onSkip,
}: {
  mode: "gate" | "edit";
  initial: string;
  onSubmit: (name: string) => void;
  onSkip: () => void;
}) {
  const inputId = useId();
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  const valid = isValidNickname(value);
  const showError = touched && !valid;
  const isGate = mode === "gate";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit(cleanNickname(value));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label
        htmlFor={inputId}
        className="mb-1 block text-xs font-600 text-muted-foreground"
      >
        ชื่อเล่น
      </label>
      <input
        id={inputId}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoFocus
        maxLength={NICKNAME_MAX}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={showError}
        aria-describedby={showError ? `${inputId}-err` : undefined}
        placeholder="เช่น น้องแมว หรือ PropertyKing"
        className="min-h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      />
      {showError ? (
        <p id={`${inputId}-err`} role="alert" className="mt-1.5 text-xs text-destructive">
          กรุณาใส่ชื่อเล่นอย่างน้อย 1 ตัวอักษร
        </p>
      ) : (
        <p className="mt-1.5 text-xs text-muted-foreground">
          สูงสุด {NICKNAME_MAX} ตัวอักษร
        </p>
      )}

      <DialogFooter className="mt-4">
        {isGate ? (
          <Button type="button" variant="ghost" onClick={onSkip}>
            ข้ามไปก่อน (เป็นแขกรับเชิญ)
          </Button>
        ) : null}
        <Button type="submit" disabled={!valid}>
          {isGate ? "เข้าสู่เวที" : "บันทึก"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function NicknameModal({ open, onOpenChange, mode = "gate" }: NicknameModalProps) {
  const { nickname, saveNickname } = useGamify();
  const isGate = mode === "gate";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* only render content while open so the form mounts fresh each time */}
      {open ? (
        <DialogContent showCloseButton={!isGate}>
          <div className="flex flex-col items-center text-center">
            <Mascot state="wave" size="md" title="ริฟฟ์" />
          </div>
          <DialogHeader className="items-center text-center">
            <DialogTitle>
              {isGate ? "ตั้งชื่อบนเวที" : "แก้ชื่อเล่น"}
            </DialogTitle>
            <DialogDescription>
              {isGate
                ? "ใส่ชื่อเล่นของคุณเพื่อเริ่มเล่น — ไม่ต้องสมัครบัญชี เราจะจำชื่อไว้บนเครื่องนี้"
                : "เปลี่ยนชื่อที่แสดงบนโปรไฟล์และลีกบอร์ด"}
            </DialogDescription>
          </DialogHeader>

          <NicknameForm
            mode={mode}
            initial={nickname}
            onSubmit={(name) => {
              saveNickname(name);
              onOpenChange(false);
            }}
            onSkip={() => {
              saveNickname("แขกรับเชิญ");
              onOpenChange(false);
            }}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

/**
 * Auto-opens the nickname modal on first visit (when no nickname is set yet).
 * `open` is derived from the store — no effect, no hydration mismatch.
 */
export function NicknameGate() {
  const { hasNickname } = useGamify();
  const [dismissed, setDismissed] = useState(false);
  const open = !hasNickname && !dismissed;

  return (
    <NicknameModal
      open={open}
      mode="gate"
      onOpenChange={(o) => {
        if (!o) setDismissed(true);
      }}
    />
  );
}
