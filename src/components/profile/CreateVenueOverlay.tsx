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
    {
      title: "Info",
      content: <VenueInfoStep data={formData} onUpdate={setFormData} />,
      validate: () =>
        formData.name?.trim() && formData.description?.trim()
          ? true
          : "Name & description required",
    },
    {
      title: "Media",
      content: <VenueMediaStep data={formData} onUpdate={setFormData} />,
    },
    {
      title: "Location",
      content: <VenueLocationStep data={formData} onUpdate={setFormData} />,
    },
    {
      title: "Pricing",
      content: <VenuePricingStep data={formData} onUpdate={setFormData} />,
      validate: () =>
        formData.price && formData.maxGuests ? true : "Price and guest capacity are required",
    },
  ];

  const isLastStep = step === steps.length - 1;

  async function handleNext() {
    const current = steps[step];
    if (current.validate) {
      const result = current.validate();
      if (result !== true) {
        toast.error(result as string);
        return;
      }
    }

    if (isLastStep) {
      try {
        setLoading(true);

        const payload = {
          name: formData.name ?? "",
          description: formData.description ?? "",
          price: formData.price ?? 0,
          maxGuests: formData.maxGuests ?? 1,
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
      } catch (err: any) {
        toast.error(err.message || "Submission failed");
      } finally {
        setLoading(false);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (step === 0) {
      onCancel();
    } else {
      setStep((prev) => Math.max(prev - 1, 0));
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={mode === "edit" ? "Edit venue form" : "Create venue form"}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-10 px-4 overflow-auto"
    >
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] w-full max-w-3xl h-[90vh] max-h-[700px] p-6 rounded-xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create Venue" : "Edit Venue"}
          </h2>
          <button onClick={onCancel} className="hover:text-red-500" aria-label="Cancel">
            <X />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === step
                  ? "bg-[var(--color-primary)] scale-110"
                  : "bg-[var(--color-muted)] opacity-40"
              } transition`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto pr-2">{steps[step].content}</div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded border hover:bg-[var(--color-border)]"
          >
            {step === 0 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            disabled={loading}
          >
            {isLastStep ? (loading ? "Saving..." : mode === "edit" ? "Update" : "Create") : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
