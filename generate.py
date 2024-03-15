from transformers import AutoModelForSeq2SeqLM,AutoTokenizer,GenerationConfig
import torch
instruct_model = AutoModelForSeq2SeqLM.from_pretrained("./fine-tuned-flan-t5", torch_dtype=torch.bfloat16)
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-large")

prompt="Generate a story to avoid alcohol addiction in tamil"
input_ids = tokenizer(prompt, return_tensors="pt").input_ids

instruct_model_outputs = instruct_model.generate(input_ids=input_ids, generation_config=GenerationConfig(max_new_tokens=300, num_beams=1))
instruct_model_text_output = tokenizer.decode(instruct_model_outputs[0], skip_special_tokens=True)

print(instruct_model_text_output)