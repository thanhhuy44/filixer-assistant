import { z } from "zod";

import { loginSchema, registerSchema } from "@/utils/zod-schemas";

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
