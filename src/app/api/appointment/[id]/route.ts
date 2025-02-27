import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const doctorId = req.headers.get("doctorId");

    if (!doctorId) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access.", ok: false },
        { status: 401 }
      );
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { status: "error", message: "Appointment not found.", ok: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: appointment,
      message: "Appointment fetched successfully.",
      ok: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "error", message: "Failed to fetch appointment.", ok: false },
        { status: 500 }
      );
    }
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const body = await req.json();
    const doctorId = req.headers.get("doctorId");

    if (!doctorId) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access.", ok: false },
        { status: 401 }
      );
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      status: "success",
      data: updatedAppointment,
      message: "Appointment updated successfully.",
      ok: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "error", message: "Failed to update appointment.", ok: false },
        { status: 500 }
      );
    }
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const doctorId = req.headers.get("doctorId");

    if (!doctorId) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access.", ok: false },
        { status: 401 }
      );
    }

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({
      status: "success",
      message: "Appointment deleted successfully.",
      ok: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "error", message: "Failed to delete appointment.", ok: false },
        { status: 500 }
      );
    }
  }
};
