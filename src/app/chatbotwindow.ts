import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StorageService } from "./_services/storage.service";
import { ChatgptService } from "./_services/chatgpt.service";

interface Message {
    content: string;
    author: 'user' | 'bot';
    thinking: boolean;
}

@Component({
    selector: 'model-window1',
    templateUrl: 'chatbotwindow.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css", '../styles.css', "../assets/vendor/css/jquery.fancybox.min.css", "../assets/vendor/css/cubeportfolio.min.css",
        "../assets/vendor/css/owl.carousel.min.css", "../assets/vendor/css/wow.css", "../assets/vendor/css/LineIcons.min.css", "../assets/vendor/css/swiper.min.css"],
})
export class ChatBotComponent {
    messages: Message[] = [];
    inputMessage: string = '';
    constructor(public dialogRef: MatDialogRef<ChatBotComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {}, private storageService: StorageService, public elem: ElementRef, public chatgptService: ChatgptService) {
            this.messages.push({content: "Hallo ik ben Sporty, de chatbot van Sports-Eye, met wat kan ik je helpen?", author: "bot", thinking: false});
    }

    sendMessage(): void {
        if (!this.inputMessage.trim()) return;

        const newMessage: Message = {
            content: this.inputMessage,
            author: 'user',
            thinking: false
        };

        this.messages.push(newMessage);
        const botMessage: Message = {
            content: "...",
            author: 'bot',
            thinking: true
        };
        // Reset input field after sending message
        this.inputMessage = '';
        this.messages.push(botMessage);
        // Simulate bot response
        this.chatgptService.sendChat(newMessage.content).subscribe(
            {
              next: data => {
                this.messages[this.messages.length-1].content = data.text.value;
                this.messages[this.messages.length-1].thinking = false;
                
             },
              error: err => {
                this.messages[this.messages.length-1].content = "Sorry, er is een fout opgetreden, probeer opnieuw!";
                this.messages[this.messages.length-1].thinking = false;
              }
          });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}