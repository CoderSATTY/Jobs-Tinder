import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export interface FilterState {
  remote: string[];
  type: string[];
  level: string[];
  location: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const handleCheckboxChange = (category: keyof Omit<FilterState, 'location'>, value: string) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({ ...filters, [category]: newValues });
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({ ...filters, location });
  };

  const handleReset = () => {
    onFiltersChange({
      remote: [],
      type: [],
      level: [],
      location: ""
    });
  };

  const FilterSection = ({ 
    title, 
    options, 
    category 
  }: { 
    title: string; 
    options: { value: string; label: string }[]; 
    category: keyof Omit<FilterState, 'location'>;
  }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <div className="space-y-1.5">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-${option.value}`}
              checked={filters[category].includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(category, option.value)}
              className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3.5 w-3.5"
            />
            <Label
              htmlFor={`${category}-${option.value}`}
              className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-2xl p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground h-8"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <FilterSection
          title="Work Mode"
          category="remote"
          options={[
            { value: "remote", label: "Remote" },
            { value: "hybrid", label: "Hybrid" },
            { value: "onsite", label: "On-site" },
          ]}
        />

        <FilterSection
          title="Job Type"
          category="type"
          options={[
            { value: "internship", label: "Internship" },
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "contract", label: "Contract" },
          ]}
        />

        <FilterSection
          title="Experience Level"
          category="level"
          options={[
            { value: "entry", label: "Entry" },
            { value: "mid", label: "Mid" },
            { value: "senior", label: "Senior" },
            { value: "lead", label: "Lead" },
          ]}
        />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Location</h4>
          <Input
            placeholder="Enter city or state..."
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="bg-background h-9"
          />
        </div>
      </div>
    </div>
  );
}
