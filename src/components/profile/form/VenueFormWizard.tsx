import { useState } from "react";
import { Venue } from "../../../types/Venue";
import { VenueInfoStep } from "./VenueInfoStep";
import { VenueMediaStep } from "./VenueMediaStep";
import { VenueLocationStep } from "./VenueLocationStep";
import { VenuePricingStep } from "./VenuePricingStep";
import { updateVenue } from "../../../lib/api/venues/updateVenue";
import { createVenue } from "../../../lib/api/venues/createVenue";
import { toast } from "react-hot-toast";

interface Props {
  mode: "create" | "edit";
  initialData?: Partial<Venue>;
  onSubmit: (data: Partial<Venue>) => Promise<void>;
  onCancel: () => void;
}

export function VenueFormStepper({ mode, initialData = {}, onSubmit, onCancel }: Props) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Venue>>(initialData);
  const [loading, setLoading] = useState(false);

  const steps = [
    <VenueInfoStep key={0} data={formData} onUpdate={setFormData} />,
    <VenueMediaStep key={1} data={formData} onUpdate={setFormData} />,
    <VenueLocationStep key={2} data={formData} onUpdate={setFormData} />,
    <VenuePricingStep key={3} data={formData} onUpdate={setFormData} />,
  ];

  const isLastStep = step === steps.length - 1;

  async function handleNext() {
    if (isLastStep) {
      try {
        setLoading(true);

        if (!formData.name || !formData.description || !formData.price || !formData.maxGuests) {
          toast.error("Missing required fields");
          return;
        }

        if (mode === "edit" && initialData?.id) {
          await updateVenue(initialData.id, {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            maxGuests: formData.maxGuests,
            media: formData.media,
            meta: formData.meta,
            location: formData.location,
          });
          toast.success("Venue updated!");
        } else if (mode === "create") {
          await createVenue({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            maxGuests: formData.maxGuests,
            media: formData.media || [],
            meta: formData.meta,
            location: formData.location,
          });
          toast.success("Venue created!");
        }

        await onSubmit(formData);
      } finally {
        setLoading(false);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  }

  function handlePrev() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-10 px-4 overflow-auto">
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] w-full max-w-3xl p-6 rounded-xl shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create Venue" : "Edit Venue"}
          </h2>
          <button onClick={onCancel} className="text-sm text-red-500 hover:underline">
            Cancel
          </button>
        </div>

        {steps[step]}

        <div className="flex justify-between pt-4">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="px-4 py-2 rounded border hover:bg-[var(--color-border)]"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            disabled={loading}
          >
            {isLastStep ? (loading ? "Saving..." : "Save") : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
