import { InfoDict } from "@/lib/resumeApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles
} from "lucide-react";

interface ParsedProfileViewProps {
  infoDict: InfoDict;
  dynamicKeys: string[];
}

// Map of known keys to their icons and labels
const KNOWN_FIELDS: Record<string, { icon: typeof User; label: string }> = {
  full_name: { icon: User, label: "Name" },
  email: { icon: Mail, label: "Email" },
  phone: { icon: Phone, label: "Phone" },
  location: { icon: MapPin, label: "Location" },
};

// Convert snake_case to Title Case for display
function formatKeyLabel(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function ParsedProfileView({ infoDict, dynamicKeys }: ParsedProfileViewProps) {
  // Separate known and dynamic fields
  const knownKeys = Object.keys(KNOWN_FIELDS);
  const allKeys = Object.keys(infoDict).filter(key => infoDict[key] !== null && infoDict[key] !== undefined);

  const knownFields = allKeys.filter(key => knownKeys.includes(key));
  const extraFields = allKeys.filter(key => !knownKeys.includes(key));

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knownFields.map(key => {
              const config = KNOWN_FIELDS[key];
              const Icon = config.icon;
              const value = infoDict[key];

              return (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                    <p className="font-medium text-foreground">{value || "Not provided"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic/Additional Fields */}
      {extraFields.length > 0 && (
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              Additional Information
              {dynamicKeys.length > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">
                  {dynamicKeys.length} auto-detected
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extraFields.map(key => {
                const value = infoDict[key];
                const isDynamic = dynamicKeys.includes(key);

                return (
                  <div
                    key={key}
                    className={`flex items-start gap-3 p-3 rounded-lg ${isDynamic ? 'bg-primary/5 border border-primary/20' : 'bg-muted/30'
                      }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {formatKeyLabel(key)}
                        {isDynamic && (
                          <span className="text-xs text-primary">✨</span>
                        )}
                      </p>
                      <p className="font-medium text-foreground mt-0.5">
                        {typeof value === 'object'
                          ? JSON.stringify(value, null, 2)
                          : value || "Not provided"
                        }
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state if no data */}
      {allKeys.length === 0 && (
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No personal information found in the resume.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
