import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { deliverConciergeRequest, getAppointmentConfiguration } from "./samayIntegrations";

const conciergeRequestSchema = z.object({
  kind: z.enum(["private_viewing", "bespoke_selection"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  city: z.string().trim().max(120).optional(),
  reference: z.string().trim().min(2).max(120),
  message: z.string().trim().max(2_000).optional(),
  selection: z
    .object({
      case: z.string().trim().min(1).max(80),
      dial: z.string().trim().min(1).max(80),
      strap: z.string().trim().min(1).max(80),
      occasion: z.string().trim().max(300).optional(),
    })
    .optional(),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  appointment: router({
    availability: publicProcedure.query(() => getAppointmentConfiguration()),
  }),

  concierge: router({
    submit: publicProcedure.input(conciergeRequestSchema).mutation(async ({ input }) => {
      const result = await deliverConciergeRequest(input);

      if (result.delivery === "failed") {
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message: "The concierge channel is temporarily unavailable. Please try again later.",
        });
      }

      return result;
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
