import { useState } from "react";
import { Venue } from "../../types/Venue";
import { VenueInfoStep } from "./form/VenueInfoStep";
import { VenueMediaStep } from "./form/VenueMediaStep";
import { VenueLocationStep } from "./form/VenueLocationStep";
import { VenuePricingStep } from "./form/VenuePricingStep";
import { updateVenue } from "../../lib/api/venues/updateVenue";
import { createVenue } from "../../lib/api/venues/createVenue";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

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

        const payload = {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          maxGuests: formData.maxGuests,
          media: formData.media || [],
          meta: formData.meta,
          location: formData.location,
          rating: formData.rating ?? 0,
        };

        if (mode === "edit" && initialData?.id) {
          await updateVenue(initialData.id, payload);
          toast.success("Venue updated!");
        } else {
          await createVenue(payload);
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
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] w-full max-w-3xl h-[90vh] max-h-[700px] p-6 rounded-xl shadow-xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create Venue" : "Edit Venue"}
          </h2>
          <button onClick={onCancel} className="hover:text-red-500">
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">{steps[step]}</div>

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
            {isLastStep ? (loading ? "Creating..." : "Create") : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
