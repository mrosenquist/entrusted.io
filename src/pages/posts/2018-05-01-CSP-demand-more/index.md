---
title: "CSP: Demand More Of Your Frontend Third-Party Providers"
date: "2015-05-01T22:11:03.284Z"
published: true
tags: ["security","policy"]
author: Matt Rosenquist
featuredImage: "./jonathon-young-492918-unsplash.jpg"
---

The content of this post is intended to help inform decision makers as such I will not go into technical detail on Content Security Policy.

Content Security Policy (CSP) is a way of defining what content a browser may access both from the website and externally via a Server Header (small bit of text sent from your website along with the content). It is an important added layer of security for all websites.

While a lot of what CSP protects against should already have protections in place (XSS vulnerabilities)  for the content locally, once you integrate a third party’s content, there is very little protection that you can put in place and there is little else that can be done to protect your website. Currently, external services are required by almost all websites to enable features such as Analytics, Ads, Maps, AB Testing; CSP is one of the only ways to limit the risks of incorporating these services.

If you consider the number of tools that a website may employ you can see just how much power an external script may have.
1. **Analytics:** Capture where the user has gone to a different website, see what a user clicks on and in what context. With tools such as SessionCam, the level of detail is amazing, capturing where the mouse moves and where it lingers.
1. **ADs:** Capture user views and clicks. Change the content of an area of the site, or take over the whole site with a popover. Pull in content from external parties especially in the case of ad brokers. Track an individual
1. **Usability Testing (A/B or Multivariate testing):** Manipulate the view that the user sees and track actions. This can change whole user journeys or payment methods.
1. **External CDN:** Provides fast access to external resources that may provide any of the above or used as part of the core code.
1. **Tag Manager:** Provides the marketing team to change what is loaded on the frontend of the website.
 
As a web developer, I can state that I have almost no control over what each of these may have access change or data exfiltrate. Therefore if any of the above were changed to do something more malicious, it would be difficult to know and stop. Additionally, when we use external scripts, that may be changed at any time outside of our control. There have been many cases of Malvertising already on well-respected sites, in most cases, the ad broker was not aware that the content it helped to serve was malicious.

There is a way to prevent the loading of external content which has been altered, however, this technique known as “Subresource Integrity” (SRI) can only be applied to when the following conditions; the content does not change regularly and the content has a unique URL for each version. These conditions mean that it cannot work for any content which by its nature requires it to be dynamic, such as AD’s, A/B testing and tag managers.

During the writing of this article, a prominent government website was affected along with 4000 others by content hosted by an external party. The sites ended up run cryptocurrency mining code. Which was lucky as there was no long-term damage to the end users and meant it was detected quickly. In this case, the issue could have been mitigated by SRI.

http://www.bbc.com/news/technology-43025788

Third-party providers are primarily concerned about providing a service, rather than the security of the service they provide. While it makes sense that a service focus on the USP, they also have a duty to be secure as well as adhere to compliance and regulations. Currently, there is little incentive for a third party to be concerned about the content they load onto a clients website. However, this would quickly change with their client insisting on a higher level of service.

While CSP is powerful, it has not been adopted as widely as it should have. A large part of this is that if misconfigured it can easily break the parts content on your site or from external parties. Third parties do not typically share what CSP should look like when using their service. As someone who has a lot of interest and experience in security I would say not having CSP enabled on your site is a significant risk; Especially as once you understand the configuration for CSP in most cases it is quick to implement. CSP also is low risk to enable as it has an inbuilt way of checking if it is working for your users without disrupting them by only reporting back issues without blocking the content. If you would like to find out if your website currently has CSP configured as well as a few other security configurations, then please go here.

The lack of constraints that it is currently possible technically place on external parties is why it is so important that decision-makers are aware of what is put on a website. An external service should only be used if it is fulfilling all of the below:
- Adding value
- It is trusted
- It is performant
- Meets compliance and regulations for your region

So how does CSP fit in? Firstly (I cannot say this enough) when you use an external provider you are always giving them a considerable amount of control of your website, there is currently no way to change that. However, CSP ensures the third party looks at the content it serves from a different perspective:

1. It is a clear standard for communicating where content comes from in a readable form.
1. It forces the 3rd party to consciously think about what content they are serving and from where. The hope is that the 3rd party will limit the number of places that content is being served from which makes it simpler to manage the risk for both you and them.
1. It means that there is more accountability on the service on the content that is has served by them or through them.
1. It gives you clear visibility of where content may be coming from especially if there are more 3rd parties which the service uses.
1. If the 3rd party needs to change where content is served from in the future, then they will need to inform you of that change.
1. It gives development team the information they need to correctly lock down where content is served from and correctly configure CSP and helps ease the adoption of CSP.
 

For the reasons above I would strongly recommend that CSP becomes part of the standard SLA / Contract between you and third-party service.
 
#### TL;DR

CSP allows a website to limit where external content is loaded from as a simple standard. External javascript content has a huge amount of power to modify content. External javascript provided need to become more responsible in what content they inject into your site. CSP starts to help by putting the clear responsibility on the third party to limit where content comes from. Hence it should be part of SLA with that external provider.

 
For those who are implementing CSP here are some good resources to follow:

https://www.troyhunt.com/implementing-content-security-policy/
https://scotthelme.co.uk/hardening-your-http-response-headers/
https://www.troyhunt.com/locking-down-your-website-scripts-with-csp-hashes-nonces-and-report-uri/
 
#### My personal top tip is to start with:

`Content-Security-Policy: default-src ‘none’;`

Which blocks everything; From there include what you need specifically against the relevant content type. Chrome and Firefox will show you what is blocked in the console.

Originally published [here](https://and.digital/blog/csp-demand-more-of-your-frontend-third-party-providers/)
