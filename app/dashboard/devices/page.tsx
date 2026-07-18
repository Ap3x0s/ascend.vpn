import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconDeviceDesktop, IconTrash } from "@tabler/icons-react";

const MAX_DEVICES = 7;

export default async function DevicesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const devices = await prisma.device.findMany({
    where: { userId: session.user.id },
    orderBy: { lastActive: "desc" },
  });

  const isAtLimit = devices.length >= MAX_DEVICES;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Устройства</h1>
        <Button disabled={isAtLimit}>
          <IconDeviceDesktop className="h-4 w-4 mr-2" />
          Добавить устройство
        </Button>
      </div>

      <p className="text-sm text-gray-400 mb-6">
        {devices.length} из {MAX_DEVICES} устройств
      </p>

      {devices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <IconDeviceDesktop className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">Нет подключённых устройств</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {devices.map((device) => (
            <Card key={device.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-card-hover flex items-center justify-center">
                      <IconDeviceDesktop className="h-6 w-6 text-accent-purple" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-gray-400">{device.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          device.isActive ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      <span className="text-sm text-gray-400">
                        {new Date(device.lastActive).toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <IconTrash className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
