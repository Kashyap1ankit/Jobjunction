import { roboto_slab } from "@/utils/fonts/font";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Faqquestions from "@/data/Faq.json";
import { FaqTypes } from "@/types/types";

export default function FAQ() {
  return (
    <div className="mx-auto mt-24 w-full md:mt-32">
      <p
        className={`${roboto_slab.className} text-center text-3xl text-white md:text-4xl`}
      >
        Frequently Asked <span className="text-primarySkyBlue">Questions</span>
      </p>
      <div>
        <Accordion type="single" collapsible className="mt-12 px-4 md:px-0">
          {Faqquestions.map((e: FaqTypes, i: number) => {
            return (
              <AccordionItem
                value={`item-${i}`}
                className="mx-auto mt-12 w-full rounded-md bg-primaryBorder px-4 md:w-1/2"
                key={i}
              >
                <AccordionTrigger className="md:text-md text-sm text-white hover:underline-offset-0">
                  {e.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  {e.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
