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
    <div className="w-full mx-auto mt-24 md:mt-32">
      <p
        className={`${roboto_slab.className} text-white text-3xl md:text-4xl text-center`}
      >
        Frequently Asked <span className="text-primarySkyBlue">Questions</span>
      </p>
      <div>
        <Accordion type="single" collapsible className="mt-12 px-4 md:px-0">
          {Faqquestions.map((e: FaqTypes, i: number) => {
            return (
              <AccordionItem
                value={`item-${i}`}
                className="w-full md:w-1/2 mx-auto bg-primaryBorder rounded-md px-4 mt-12"
                key={i}
              >
                <AccordionTrigger className="text-white hover:underline-offset-0 text-sm md:text-md">
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
