import type { AllFormFields, StepFormData } from "@/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { useForm } from "react-hook-form";

function FormField({
  id,
  label,
  register,
  errors,
  type = "text",
  maxLength,
}: {
  id: keyof AllFormFields;
  label: string;
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="space-y-2">
      {/* 
        Label with htmlFor attribute
        
        Why htmlFor?
        - Accessibility: Screen readers associate label with input
        - UX: Clicking label focuses the input
        - Mobile: Larger click target
      */}
      <Label htmlFor={id}>{label}</Label>

      {/* 
        Input field registered with React Hook Form
        
        {...register(id)} spreads these properties:
        - name: Field identifier
        - onChange: Updates form state
        - onBlur: Triggers validation (depending on mode)
        - ref: React Hook Form needs ref to control the input
        
        Why spread instead of individual props?
        - Cleaner code
        - Forward compatibility (new props added by React Hook Form)
        - Less maintenance
      */}
      <Input id={id} type={type} maxLength={maxLength} {...register(id)} />

      {/* 
        Conditional Error Message
        
        Only renders when:
        1. errors[id] exists (field has error)
        2. errors[id].message exists (error has message)
        
        Styling:
        - text-sm: Smaller text
        - text-destructive: Red color (shadcn theme variable)
        
        Why conditional rendering?
        - Clean UI when no errors
        - No empty space reserved
        - Progressive disclosure pattern
      */}
      {errors[id] && (
        <p className="text-sm text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
}

export default FormField;
