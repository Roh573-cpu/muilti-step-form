import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number is too short" })
    .max(15, { message: "Phone number is too long" }),
});

export const professionalInfoSchema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  experience: z.enum(["0-2", "3-5", "6-10", "10+"]),
  industry: z.string().min(1, { message: "Industry is required" }),
});

export const billingInfoSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(16, { message: "Card number must be 16 digits" }),
  cardHolder: z.string().min(1, { message: "Card holder name is required" }),
  expiryDate: z.string().min(4, { message: "Invalid expiry date" }),
  cvv: z.string().min(3, { message: "Invalid CVV" }).max(4),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
export type BillingInfo = z.infer<typeof billingInfoSchema>;
export type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo;
export type AllFormFields = PersonalInfo & ProfessionalInfo & BillingInfo;

/** --- Step Metadata Type --- */
export interface Step {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
